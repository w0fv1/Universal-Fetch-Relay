import { env, createExecutionContext } from 'cloudflare:test';
import { afterEach, describe, expect, it, vi } from 'vitest';
import worker from '../src/index.js';

const relayHeaders = {
	'Fetch-Relay-Authorization': 'Bearer test-relay-token',
	'Fetch-Relay-Target': 'https://api.example.com/v1/items?limit=2',
};

afterEach(() => vi.restoreAllMocks());

function execute(request) {
	return worker.fetch(request, env, createExecutionContext());
}

describe('Universal Fetch Relay', () => {
	it('requires relay authentication', async () => {
		const response = await execute(new Request('https://relay.example/'));
		expect(response.status).toBe(401);
		expect(await response.json()).toMatchObject({ error: 'unauthorized' });
	});

	it('accepts targets only through Fetch-Relay-Target', async () => {
		const response = await execute(new Request('https://relay.example/?url=https://api.example.com', {
			headers: { 'Fetch-Relay-Authorization': 'Bearer test-relay-token' },
		}));
		expect(response.status).toBe(400);
		expect(await response.json()).toMatchObject({ error: 'missing_target_header' });
	});

	it('forwards method, authorization, custom headers, and body', async () => {
		const fetchSpy = vi.spyOn(globalThis, 'fetch').mockImplementation(async (target, init) => {
			expect(String(target)).toBe('https://api.example.com/v1/items?limit=2');
			expect(init.method).toBe('POST');
			expect(init.headers.get('Authorization')).toBe('Bearer upstream-secret');
			expect(init.headers.get('X-Custom')).toBe('kept');
			expect(init.headers.has('Fetch-Relay-Target')).toBe(false);
			expect(init.headers.has('Fetch-Relay-Authorization')).toBe(false);
			expect(await new Response(init.body).text()).toBe('{"hello":"world"}');
			return new Response('{"ok":true}', { status: 201, headers: { 'Content-Type': 'application/json' } });
		});

		const response = await execute(new Request('https://relay.example/', {
			method: 'POST',
			headers: {
				...relayHeaders,
				Authorization: 'Bearer upstream-secret',
				'Content-Type': 'application/json',
				'X-Custom': 'kept',
			},
			body: '{"hello":"world"}',
		}));

		expect(fetchSpy).toHaveBeenCalledOnce();
		expect(response.status).toBe(201);
		expect(await response.text()).toBe('{"ok":true}');
	});

	it('streams an upstream response without reading it into memory', async () => {
		const stream = new ReadableStream({
			start(controller) {
				controller.enqueue(new TextEncoder().encode('first\n'));
				controller.enqueue(new TextEncoder().encode('second\n'));
				controller.close();
			},
		});
		vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(stream, {
			headers: { 'Content-Type': 'text/event-stream' },
		}));

		const response = await execute(new Request('https://relay.example/', { headers: relayHeaders }));
		expect(response.body).not.toBeNull();
		expect(await response.text()).toBe('first\nsecond\n');
	});

	it('isolates redirects and cookies', async () => {
		vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, {
			status: 302,
			headers: {
				Location: 'https://other.example/path',
				'Set-Cookie': 'session=secret',
			},
		}));

		const response = await execute(new Request('https://relay.example/', { headers: relayHeaders }));
		expect(response.status).toBe(302);
		expect(response.headers.get('Location')).toBeNull();
		expect(response.headers.get('Fetch-Relay-Location')).toBe('https://other.example/path');
		expect(response.headers.get('Set-Cookie')).toBeNull();
	});

	it.each([
		['http://127.0.0.1/private', 'ip_literal_forbidden'],
		['http://[::1]/private', 'ip_literal_forbidden'],
		['http://localhost/private', 'local_target_forbidden'],
		['file:///tmp/data', 'unsupported_protocol'],
	])('rejects unsafe target %s', async (target, error) => {
		const response = await execute(new Request('https://relay.example/', {
			headers: { ...relayHeaders, 'Fetch-Relay-Target': target },
		}));
		expect(response.status).toBe(400);
		expect(await response.json()).toMatchObject({ error });
	});

	it('answers browser preflight without contacting the target', async () => {
		const fetchSpy = vi.spyOn(globalThis, 'fetch');
		const response = await execute(new Request('https://relay.example/', {
			method: 'OPTIONS',
			headers: {
				'Access-Control-Request-Method': 'PATCH',
				'Access-Control-Request-Headers': 'authorization,fetch-relay-target,fetch-relay-authorization',
			},
		}));
		expect(response.status).toBe(204);
		expect(response.headers.get('Access-Control-Allow-Methods')).toBe('PATCH');
		expect(fetchSpy).not.toHaveBeenCalled();
	});
});

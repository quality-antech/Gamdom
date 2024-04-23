import { test, expect } from '@playwright/test';
import { eventsResponse } from '../utils/Responses/GET_EVENTS_RESPONSE';
import { ENDPOINT } from '../utils/endpoints';

test('should get events', async ({ request }) => {
    const eventResponse = await request.get(ENDPOINT.GET_EVENTS);
    expect(eventResponse.ok());
    expect(eventResponse.status()).toBe(200);
    const responseBody = await eventResponse.json()

    expect(responseBody[0]).toHaveProperty('name', 'Issue Created');
    expect(responseBody[0]).toHaveProperty('id', 1);
    expect(responseBody).toEqual(eventsResponse);
});

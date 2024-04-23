import { test, expect } from '@playwright/test';
import { DELETE_ISSUE_ENDPOINT, ENDPOINT, GET_ISSUE_ENDPOINT } from '../utils/endpoints';
import { BULK_ISSUES } from '../utils/Requests/POST_BULK_ISSUE_BODY';
import { CREATE_ISSUE } from '../utils/Requests/POST_ISSUE_BODY';
import { statuses } from '../utils/statuses';

let projectKey = 'QA';
let newKey: string;
test('Create a new issue', async ({ request }) => {
    const response = await request.post(ENDPOINT.POST_ISSUES, {
        data: CREATE_ISSUE
    });
    const responseBody = await response.json();
    expect(response.status()).toEqual(statuses.Created.value);
    expect(response.statusText()).toBe(statuses.Created.name);
    newKey = responseBody.key;

    const getIssue = await request.get(GET_ISSUE_ENDPOINT(newKey));
    const getIssueResponse = await getIssue.json();
    expect(getIssue.status()).toEqual(statuses.OK.value)
    expect(getIssueResponse.key).toEqual(newKey);
    expect(getIssueResponse.fields.project.key).toEqual(projectKey);
});

test('Archive an issue is available for premium users and returns 403 error', async ({ request }) => {
    const response = await request.post(ENDPOINT.POST_ISSUES, {
        data: CREATE_ISSUE,
    });
    const responseBody = await response.json();
    newKey = responseBody.key;

    const archiveResponse = await request.put(ENDPOINT.PUT_ARCHIVE, {
        data: {
            issueIdsOrKeys: [newKey],
        }
    })

    expect(archiveResponse.status()).toBe(statuses.Forbidden.value);
});

test('Create bulk issues', async ({ request }) => {
    const bulkResponse = await request.post(ENDPOINT.POST_BULK_ISSUES, {
        data: BULK_ISSUES,
    });

    expect(bulkResponse.status()).toBe(statuses.Created.value);
    const bulkResponseBody = await bulkResponse.json();
    console.log(bulkResponseBody);
    expect(bulkResponseBody.issues).toHaveLength(2);
});

test('Delete an issue', async ({ request }) => {
    const response = await request.post(ENDPOINT.POST_ISSUES, {
        data: CREATE_ISSUE,
    });
    const responseBody = await response.json();
    newKey = responseBody.key;

    const deleteIssueResponse = await request.delete(DELETE_ISSUE_ENDPOINT(newKey));
    expect(deleteIssueResponse.status()).toBe(statuses.Delete.value);
    expect(deleteIssueResponse.statusText()).toBe(statuses.Delete.name);

    const getIssueResponse = await request.get(GET_ISSUE_ENDPOINT(newKey));
    expect(getIssueResponse.status()).toBe(statuses.NotFound.value);
});
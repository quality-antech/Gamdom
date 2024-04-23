export const ENDPOINT = {
    GET_EVENTS: '/rest/api/2/events',
    POST_ISSUES: '/rest/api/2/issue',
    GET_ISSUE: '/rest/api/2/issue/',
    PUT_ARCHIVE: '/rest/api/2/issue/archive',
    POST_BULK_ISSUES: '/rest/api/2/issue/bulk',
    DELETE_ISSUE:'/rest/api/2/issue/',
}

export const GET_ISSUE_ENDPOINT = (issueID: string) => {
    return ENDPOINT.GET_ISSUE + issueID;
} 

export const DELETE_ISSUE_ENDPOINT = (issueID: string) => {
    return ENDPOINT.DELETE_ISSUE + issueID;
} 
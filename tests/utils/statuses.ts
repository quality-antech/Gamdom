type Status = {
    name: string;
    value: number;
};

export const statuses: { [key: string]: Status } = {
    Created: { name: "Created", value: 201 },
    OK: { name: "OK", value: 200 },
    InProgress: { name: "In Progress", value: 102 },
    Error: { name: "Error", value: 500 },
    Forbidden: { name: "Forbidden", value: 403 },
    Delete: { name: "No Content", value: 204 },
    NotFound: { name: "Not Found", value: 404 }
};
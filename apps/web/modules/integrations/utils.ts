import {
    HTML_SCRIPT,
    JAVASCRIPT_SCRIPT,
    NEXTJS_SCRIPT,
    REACT_SCRIPT,
    type IntegrationId,
} from "./constants";

export const createScript = (
    integrationId: IntegrationId,
    organizationId: string
) => {
    switch (integrationId) {
        case "html":
            return HTML_SCRIPT.replace(/{{ORGANIZATIONID}}/g, organizationId);

        case "react":
            return REACT_SCRIPT.replace(/{{ORGANIZATIONID}}/g, organizationId);

        case "nextjs":
            return NEXTJS_SCRIPT.replace(/{{ORGANIZATIONID}}/g, organizationId);

        case "javascript":
            return JAVASCRIPT_SCRIPT.replace(/{{ORGANIZATIONID}}/g, organizationId);

        default:
            return "";
    }
};
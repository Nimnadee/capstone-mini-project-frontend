import {Guide, MatchingGuide} from "@/service/guide.service";
import {Project} from "@/service/project.service";

export interface ProjectRequest {
     id: string;
    guideId: string;
    projectId: string;
    status: string;

    guideEmail:string;

    projectTitle:string;

    projectSummary:string;

    studentEmail:string;
}

// export interface ProjectRequestResponse{
//     guideId: string;
//     projectId: string;
//     status: string;
// }

export async function createRequest(projectRequest: ProjectRequest): Promise<ProjectRequest> {
    const url: string = "http://localhost:3000/projectRequests";
    const request = new Request(url, {
        body: JSON.stringify(projectRequest),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "POST",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const projectRequest1: ProjectRequest = await response.json();

    return projectRequest1;
}

export async function deleteRequest(id: string): Promise<ProjectRequest> {
    const url: string = "http://localhost:3000/projectRequests/" + id;
    const request = new Request(url, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "DELETE",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const projectRequest: ProjectRequest = await response.json();

    return projectRequest;
}

export async function getRequestsByGuide(guideId:string): Promise<ProjectRequest[]> {
    const url: string = "http://localhost:3000/projectRequests/"+guideId;
    const response: Response = await fetch(url, { cache: "no-store" });
    console.log("project requests for guide, "+guideId+ ":  \n"+response);

    const projectRequests: ProjectRequest[] = await response.json();

    console.log ("response(service)",projectRequests);

    return projectRequests;
}
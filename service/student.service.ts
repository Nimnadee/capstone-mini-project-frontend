
export interface Student {
    success: any;
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export async function saveStudent(studentRequest: Student): Promise<Student> {
    const url: string = "http://localhost:3000/auth/signup/student";
    const request = new Request(url, {
        body: JSON.stringify(studentRequest),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "POST",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    const student: Student = await response.json();

    return student;
}

export interface StudentLogin {
    email: string;
    password: string;
}

export async function loginStudent(studentRequest: StudentLogin): Promise<Student> {
    const url: string = "http://localhost:3000/auth/login/student";
    const request = new Request(url, {
        body: JSON.stringify(studentRequest),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        method: "POST",
        cache: "no-store",
    });
    const response: Response = await fetch(request);
    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Login failed");
    }
    const student: Student = await response.json();

    return student;
}

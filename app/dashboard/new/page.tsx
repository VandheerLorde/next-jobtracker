import { auth } from "@/auth";
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function AddJobPage() {

    async function createJob(formData: FormData) {
        "use server";

        const session = await auth();
        if (!session?.user?.email) return;

        const jobData = {
            position: formData.get("position") as string,
            company: formData.get("company") as string,
            location: formData.get("location") as string,
            salary: formData.get("salary") as string | null,
            url: formData.get("url") as string | null,
        };

        await db.job.create({
            data: {
                ...jobData,
                user: {
                    connect: {
                        email: session.user.email,
                    },
                },
            },
        });

        revalidatePath("/dashboard");
        redirect("/dashboard");
    }

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Add a new job</h1>

            <form action={createJob} className="jobForm">
                <input
                    type="text"
                    name="position"
                    placeholder="e.g. Frontend Developer"
                    required
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="company"
                    placeholder="e.g. Google"
                    required
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="e.g. São Paulo"
                    required
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="salary"
                    placeholder="e.g. 2500R$"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="text"
                    name="url"
                    placeholder="e.g. Job listing link"
                    className="border p-2 rounded w-full"
                />
            <button type="submit">Add a new job</button>
            </form>
        </div>
    )
}
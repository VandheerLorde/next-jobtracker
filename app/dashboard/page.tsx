import { auth } from "@/auth"
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import JobCard from '@/components/JobCard';

export default async function DashboardPage() {
    const session = await auth();
    const userEmail = session?.user?.email;

    if(!userEmail) {
        redirect("/api/auth/signin");
    }

    const jobs = await db.job.findMany({
        where: {
            user: {
                email: userEmail,
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p>Found {jobs.length} applications.</p>
            <div className="grid gap-4 mt-4">
                {jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        position={job.position}
                        company={job.company}
                        location={job.location}
                        salary={job.salary}
                        url={job.url}
                    />
                ))}
            </div>
        </div>
    )
}
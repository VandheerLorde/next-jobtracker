interface JobCardProps {
    position: string,
    company: string,
    location: string | null,
    salary: string | null,
    url: string | null
}

export default function JobCard({ position, company, location, salary, url }: JobCardProps) {
    return (
        <div className="border p-4 rounded-lg shadow-sm">
            <h2 className="font-bold text-lg">{position}</h2>
            <h3 className="font-bold text-lg">{company}</h3>
            <h4 className="font-bold text-lg">{location || "Remote"}</h4>
            {salary && <h5 className="font-bold text-lg" >{salary}</h5>}
            {url && <a className="font-bold text-lg" href={url}>{url}</a>}
        </div>
    );
}
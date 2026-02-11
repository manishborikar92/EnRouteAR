import Section from '@/components/layout/Section';
import { EXTERNAL_LINKS } from '@/lib/constants';

// ============================================================================
// CollegeInfo — KITS Ramtek college information section
// ============================================================================

export default function CollegeInfo() {
    return (
        <Section id="college-info">
            <h2 className="mb-4 text-2xl font-bold text-gold md:text-3xl">
                College Information
            </h2>
            <p className="mb-3 text-justify leading-relaxed text-sky">
                Kavikulguru Institute of Technology and Science, Ramtek is a private,
                un-aided Institution run by Vodithala Education Society, Hyderabad
                established with an objective of providing quality technical education to
                rural students. The Institute&apos;s foundation stone was laid by former
                Prime Minister Late Sri P. V. Narsimha Rao on 19/09/1985. It was at his
                insistence that Late Sri V. Rajeshwara Rao, former MP (Rajya Sabha) and
                founder chairman of society — a philanthropist and great visionary
                established this Institute in a small rural town of Ramtek. The
                Institute is well known for its discipline, providing quality education,
                concern for the society and environment. The Institute is permanently
                affiliated to Rashtrasant Tukadoji Maharaj Nagpur University (RTMNU),
                Nagpur. The Institute offers B.E., B.Arch., M.Tech. and Ph.D. programs.
            </p>
            <p className="mb-3 text-justify leading-relaxed text-sky">
                The Institute has lush green pollution free sprawling campus in 48.96
                acres. The Institute has been awarded &apos;A&apos; Grade twice by
                Maharashtra State Government. The Institute has received the
                accreditation by National Board of Accreditation (NBA) twice in the past
                and accredited by NAAC with B++ Grade.
            </p>
            <p className="mb-3 text-justify leading-relaxed text-sky">
                Departments — Library, Canteen, Gym/Indoor Stadium, Hostels
            </p>
            <p className="mb-3 text-justify leading-relaxed text-sky">
                Welcome to our college, where every corner resonates with the vibrancy
                of knowledge and the spirit of learning. While we have provided a
                glimpse of our institution, there&apos;s so much more waiting for you to
                discover. For a comprehensive exploration of our college, including
                in-depth information about our departments, state-of-the-art library,
                canteen, well-equipped gym, and more, we invite you to delve into the
                rich tapestry of details available on our official website.
            </p>
            <p className="text-sky">
                <a
                    href={EXTERNAL_LINKS.collegeWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-blue transition-colors hover:text-sky-light"
                >
                    kits.edu
                </a>
            </p>
        </Section>
    );
}

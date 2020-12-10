import ReactPlayer from "react-player/youtube";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout animation={0}>
      <center>
        <h4 style={{ fontWeight: 700 }}>
          React Frontend Developer - Asep Khairul Anam
        </h4>
        <ReactPlayer
          url="https://www.youtube.com/watch?v=nN7ngcJdOoI"
          width="80%"
          height="50vh"
          controls={true}
          className="mt-3"
        />
        <p className="mt-4" style={{ maxWidth: 976, fontWeight: 500 }}>
          I am an Full-Stack Javascript Developer who has a desire to explore
          something new related to technology and startups. want to work with
          professionals to improve my skills, compete in the era of industry 4.0
          and provide more benefits for me and the company
        </p>
      </center>
    </Layout>
  );
}

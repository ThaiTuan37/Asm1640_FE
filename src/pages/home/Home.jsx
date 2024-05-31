import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.css";
import reportApi from '../../api/report'
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState({})
  useEffect(() => {
    const handler = async () => {
      const reportData = await reportApi.get();

      setData(reportData)
    }

    handler()
  }, [])


  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="card">
          <h3>Event ranking</h3>
          <div>
            <table>
              <tr>
                <th>Event name</th>
                <th>Contribution</th>
              </tr>
              {
                data?.top_events?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.contribution_count}</td>
                    </tr>
                  )
                })
              }

            </table>
          </div>
        </div>
        
        <div className="card margin-bottom-m">
          <h3>Top contribution has the highest number of likes</h3>
          <div>
            <table>
              <tr>
                <th>Event</th>
                <th>Contribution</th>
                <th>Number of likes</th>
              </tr>
              {
                data?.top_liked_contributions?.map((item,index) => {
                  return (
                    <tr key={index}>
                      <td>{item.event}</td>
                      <td>{item.contributor}</td>
                      <td>{item.like_count}</td>
                    </tr>
                  )
                })
              }

            </table>
          </div>
        </div>

        <div className="card margin-bottom-m">
          <h3>Top contribution has the highest number of dislikes</h3>
          <div>
            <table>
              <tr>
                <th>Event</th>
                <th>Contribution</th>
                <th>Number of dislikes</th>
              </tr>
              {
                data?.top_disliked_contributions?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.event}</td>
                      <td>{item.contributor}</td>
                      <td>{item.dislike_count}</td>
                    </tr>
                  )
                })
              }

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

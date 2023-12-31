import React from "react";
import { Grid } from "@material-ui/core";
import { SearchBar, VideoDetails, VideoList } from "./components";
import youtube from "./api/youtube";
import app from "./components/app.css";

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
  };

  componentDidMount() {
    this.handleSubmit("pdf generation with react and node");
  }

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  handleSubmit = async (searchTerm) => {
    const response = await youtube.get("search", {
      params: {
        part: "snippet",
        maxResults: 5,
        key: "AIzaSyBa2XxLDGc-EHFuis0hOVdTBC1yHMZIrxs",
        q: searchTerm,
      },
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  render() {
    const { selectedVideo, videos } = this.state;
    return (
      <Grid justifyContent="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetails video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
export default App;
// const App = () => {
//   handleSubmit = async (searchTerm) => {
//     const response = await youtube.get("search", { params: { q: searchTerm } });
//     console.log(response);
//   };
//   return (
//     <Grid justifyContent="center" container spacing={16}>
//       <Grid item xs={12}>
//         <Grid container spacing={16}>
//           <Grid item xs={12}>
//             <SearchBar onFormSubmit={this.handleSubmit} />
//             <Grid item xs={8}>
//               <VideoDetails />
//             </Grid>
//             <Grid item xs={4}>
//               {/*video list*/}
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

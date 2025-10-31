import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";

const Loading = () => {
  return (
<section className="h-[80vh] w-full flex container justify-center items-center" >
        <Box sx={{ display: "flex"  }}>
      <CircularProgress/>
      {/* <LinearProgress /> */}
    </Box>
</section>
  );
};

export default Loading;

import React, { Suspense } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import RandomNumber from "./random-number";
import { ProfileDetails } from "./profile-details";
import { ProfileTimeline } from "./profile-timeline";
import { fetchProfileData } from "../../data/fakeAPI";

const resource = fetchProfileData();

// const RN = React.lazy(() => import("./random-number"))

const SuspenseEx = () => {
  return (
    <div className="App">
      <p>with Suspense</p>
      <Suspense fallback={<CircularProgress color="secondary" />}>
        <ProfileDetails resource={resource} />
        <ProfileTimeline resource={resource} />
      </Suspense>
      <p>Without suspense, using useEffect</p>
      <RandomNumber />
    </div>
  );
};

export default SuspenseEx;

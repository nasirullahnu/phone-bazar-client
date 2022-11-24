import React from "react";

const Loading = () => {
  return (
    <div class="h-[100px] flex justify-center items-center mx-8 my-8">
        <progress className="progress w-56"></progress>
    </div>
  );
};

export default Loading;
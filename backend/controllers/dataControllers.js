const { spawn } = require("child_process");

const callPy = async () => {
  let value = [];
  // spawn new child process to call the python script
  const python = spawn("python3", ["./DexcomG6/readBG.py"]);

  // Return a promise wrapping the asynchronous operation
  return new Promise((resolve, reject) => {
    // collect data from script
    python.stdout.on("data", function (data) {
      console.log("Pipe data from python script ...");
      value.push(data);
    });

    // handle process close event
    python.on("close", (code) => {
      console.log(`python process close all stdio with code ${code}`);
      // resolve the promise with the collected data
      resolve(value.join(""));
    });

    // handle error event
    python.on("error", (err) => {
      console.error("Error executing python script:", err);
      // reject the promise with the error
      reject(err);
    });
  });
};
exports.getGlucose = async (req, res) => {
  console.log("dataController");

  try {
    const glucose = await callPy();
    res.status(200).json({
      status: "success",
      data: glucose,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error fetching glucose data",
      error: error.message,
    });
  }
};

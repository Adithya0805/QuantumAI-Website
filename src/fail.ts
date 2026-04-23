// This file was created to simulate a failure point in the project.
// It contains a type error to trigger a build or lint failure.

export const simulateFailure = () => {
  const x: number = "This is a string, not a number";
  return x;
};

// Also, a console log which might be flagged by some lint rules
console.log("Failure simulated");

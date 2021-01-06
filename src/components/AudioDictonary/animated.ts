const animatedContainerStyle = ({ mood, signalState }) => ({
  background:
    mood === -1
      ? signalState.interpolate({
          range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
          output: [
            "rgba(0,0,0,0)",
            "rgba(184, 12, 43,0.97)",
            "rgba(160, 2, 37,0.9)",
            "rgba(184, 12, 43,1)",
            "rgba(160, 2, 37,0.9)",
            "rgba(160, 2, 37,0.97)",
            "rgba(184, 12, 43,0.67)",
            "rgba(0,0,0,0)]",
          ],
        })
      : mood === 1
      ? signalState.interpolate({
          range: [0, 0.5, 1],
          output: ["rgba(40,195,138,1)", "#01915c", "rgba(40,195,138,1)]"],
        })
      : "rgba(0,0,0,0)]",
});

const animatendCardStyle = ({ mood, signalState }) => ({
  transform:
    mood === -1
      ? signalState
          .interpolate({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
          })
          .interpolate((x) => `scale(${x})`)
      : signalState
          .interpolate({
            range: [0, 0.5, 1],
            output: [1, 1.15, 1],
          })
          .interpolate((x) => `scale(${x})`),
});

export { animatedContainerStyle, animatendCardStyle };

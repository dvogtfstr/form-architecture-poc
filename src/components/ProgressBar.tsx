import useProgress from 'hooks/useProgress';

const ProgressBar = () => {
  const progress = useProgress();

  return (
    <div className="Row">
      {progress.map(({ allFields, validFields }, stepIndex) => (
        <div key={stepIndex} className="Spacer-hr">
          <span>Step {stepIndex + 1}</span>
          <br />
          <span>
            Done {validFields} / {allFields}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;

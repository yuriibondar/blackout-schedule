// The schedule table markup comes from external service, so CSS classes must match to external ones
import "./ExternalScheduleTable.css";

const ExternalScheduleTable = ({ schedule }) => {
  return <div dangerouslySetInnerHTML={{ __html: schedule }}></div>;
};

export default ExternalScheduleTable;

import Calendar from "@diary/components/Calendar.tsx";
import BackToolbar from "@shared/ui/BackToolbar.tsx";

export const DiaryPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: '100%'}}>
      <BackToolbar title="감정일기" />
      <Calendar />
    </div>
  );
};

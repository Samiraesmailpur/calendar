import { Box, Button } from "@mui/material";

const ExportFileButton = ({ events }) => {
  const downloadJsonFile = () => {
    const exportJsonData = events.map((item) => ({
      duration: item.duration,
      start: item.start,
      title: item.title,
    }));
    const content = JSON.stringify(exportJsonData, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "today-calendar.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box>
      <Button variant="outlined" type="button" onClick={downloadJsonFile}>
        Export json
      </Button>
    </Box>
  );
};

export default ExportFileButton;

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import channels from "./Channels";
import messageCountList from "./MessageCountList";

const EngagementHelper = {

engagementMessageOverTimeChartOptions: function(){
  const filterChannels = channels.filter(channel => {  
    return messageCountList.some(
      msg => msg.channelId === channel.id && msg.count !==1 
    );
  }
  );

  const seriesData = filterChannels.map(channel => {
    const data = messageCountList
      .filter(msg => msg.channelId === channel.id && msg.count !==1)
      .map(msg => ({
        x: new Date(msg.timeBucket).getTime(),
        y: parseInt(msg.count),
        channelId: channel.id,
        channelName: channel.name
      }));

    return {
      name: channel.name,
      data: data
    };
  });

  const options = {
    chart: { type: "spline", zoomType: "x"},
    title: { text: "Messages over period of Time"},
    xAxis: { type: "datetime",
      title: { text: "Date" }
    },
    yAxis: {
      title: { text: "Message Count"}
    },
    tooltip: {
      formatter: function () {
        return (
          "<b>" +
          this.series.name +
          "</b><br>" +
          "Date: " +
          Highcharts.dateFormat("%Y-%m-%d", this.x) +
          "<br>Messages: " +
          this.y
        );
      }
    },
    series: seriesData
  };
  return options;
}
};


const EngagementMessagesOverTime = ({ messageCountList, channels }) => {
  const options = EngagementHelper.engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default EngagementMessagesOverTime;



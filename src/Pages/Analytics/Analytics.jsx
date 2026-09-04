import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = [] } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/application/total-fees/stats");
      return res.data;
    },
  });

  const array = [stats];

  console.log(typeof array);

  const getPieChartData = (data) => {
    if (!data || Object.keys(data).length === 0) return [];
    return [
      { name: "Total User", value: data.totalUser },
      { name: "Total Scholarship", value: data.totalScholarship },
      { name: "Total Application", value: data.totalApplication },
      { name: "Total Fees", value: data.totalFees },
    ];
  };
  return (
    <div>
      <p>Total User :{stats.totalUser} </p>
      <p>Total Application :{stats.totalApplication} </p>
      <p>Total Scholarship :{stats.totalScholarship} </p>
      <p>Total Fees Collected :{stats.totalFees} </p>
      {/* piechart */}
      <div className="w-full h-[400px]">
        <BarChart
          width={700}
          height={400}
          data={getPieChartData(stats)}
          margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip cursor={{ fillOpacity: 0.5 }} />
          <XAxis dataKey="name" />
          <YAxis width="auto" />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Analytics;

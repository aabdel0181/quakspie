import React, { useMemo } from 'react'
import DashboardBox from '../../components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery, useGetDeviceDataQuery } from '../../state/api'
import BoxHeader from '../../components/BoxHeader'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis, Legend } from 'recharts'
import { useTheme } from '@mui/material'

type Props = {}

const Row2 = (props: Props) => {
  const { palette } = useTheme();
  const { data, isLoading, error } = useGetDeviceDataQuery();
 
  const deviceIdToFilter = "GPU-bbc80d76-6599-a3e1-0cb6-db0b4fb59df6";
 
  // Filter and process data for Temperature chart
  const temperatureData = useMemo(() => {
    return data
        ?.filter(({ DeviceId }) => DeviceId === deviceIdToFilter) // Filter by DeviceId
        .map(({ Timestamp, Temperature }) => ({
            name: new Date(Timestamp).toLocaleString(), // Format timestamp to full date and time for the x-axis
            value: Temperature,
        }));
}, [data]);

// Filter and process data for PowerUsage chart
const powerUsageData = useMemo(() => {
  return data
      ?.filter(({ DeviceId }) => DeviceId === deviceIdToFilter) // Filter by DeviceId
      .map(({ Timestamp, PowerUsage }) => ({
          name: new Date(Timestamp).toLocaleString(), // Format timestamp to full date and time for the x-axis
          value: PowerUsage,
      }));
}, [data]);

  return (
    <>
    {/* Temperature Chart */}
    <DashboardBox gridArea="c">
                <BoxHeader
                    title="Temperature Over Time"
                    subtitle="Visualizing temperature of devices over time"
                    sideText="Last updated"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={temperatureData}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 0,
                            bottom: 20,
                        }}
                    >
                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis tickLine={false} style={{ fontSize: "10px" }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke={palette.error.main} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>

            {/* PowerUsage Chart */}
            <DashboardBox gridArea="d">
                <BoxHeader
                    title="Power Usage Over Time"
                    subtitle="Visualizing power usage of devices over time"
                    sideText="Last updated"
                />
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={powerUsageData}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 0,
                            bottom: 20,
                        }}
                    >
                        <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
                        <YAxis tickLine={false} style={{ fontSize: "10px" }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke={palette.info.main} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>
    </>
    
  )
}

export default Row2
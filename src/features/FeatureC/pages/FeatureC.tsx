import { Accordion, CSSProperties, Group, Paper, Stack, Stepper, StepperStylesNames, Text } from '@mantine/core';
import { Check, Truck } from '@phosphor-icons/react';
import { LatLngTuple } from 'leaflet';
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import accordionClass from './Accordion.module.css';
import stepperClass from './Stepper.module.css';
import classes from './FeatureC.module.css';


const position = [-6.2, 106.8] as LatLngTuple;

const TrackingLog = [
  { description: "Menuju Lokasi Pengambilan", date: "01-02-2024", completed: true },
  { description: "Tiba di Lokasi Pengambilan", date: "04-02-2024", completed: true },
  { description: "Mengangkut Muatan", date: "14-02-2024", completed: true },
  { description: "Menuju Lokasi Pengiriman", date: "24-02-2024", completed: true },
  { description: "Tiba di Lokasi Pengiriman", date: null, completed: false },
  { description: "Bongkar Mutan", date: null, completed: false },
  { description: "Selesai", date: null, completed: false },
];

const DriverTrackingLog = [
  { position: "Jl. Mahameru Raya 40B, Jakarta Timur", date: "01-02-2024", completed: true },
  { position: "Jl. Lokasi 1", date: "04-02-2024", completed: true },
  { position: "Jl. Lokasi 2", date: "14-02-2024", completed: true },
  { position: "Jl. Lokasi 3", date: null, completed: false },
  { position: "Jl. Lokasi 4", date: null, completed: false },
];


export const FeatureC = () => {

  const [active, setActive] = useState<string | null>("lacak");

  return (
    <div className={classes.mapLayout}>
      <div className={classes.mapSidebar}>
        <div className={classes.mapSidebarHeader}>
          <h3>Tracking Map</h3>
        </div>

        <div className={classes.mapSidebarContent}>
          <Accordion h="100%" classNames={{
            item: accordionClass.item,
            control: accordionClass.control,
            content: accordionClass.content,
            label: accordionClass.label,
          }}
            value={active}
            onChange={(v) => {
              if (!v) return;
              setActive(v);
            }}
          >
            <Accordion.Item value="lacak">
              <Accordion.Control>Lacak Pengiriman</Accordion.Control>
              <Accordion.Panel p={0}>
                <Paper mih="100%" h="calc(100dvh - 8px - 128px - 96px)" bg="#fafafa" p={24}>
                  <Stepper size="xs" contentPadding={0} orientation="vertical"
                    active={
                      TrackingLog.findIndex((log) => !log.completed)
                    } iconSize={32}
                    allowNextStepsSelect={false}
                    completedIcon={<Check weight="bold" size={16} />}
                    icon={<></>}
                    classNames={{
                      verticalSeparator: stepperClass.verticalSeparator,
                      step: stepperClass.step,
                      stepIcon: stepperClass.stepIcon,
                    }}>
                    {
                      TrackingLog.map((log, index) => {
                        return <Stepper.Step key={index} label={log.description || "-"} description={log.date || "-"} />;
                      })
                    }
                  </Stepper>
                </Paper>

              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item value="driver">
              <Accordion.Control>DLV-122343</Accordion.Control>
              <Accordion.Panel  >
                <Paper mih="calc(76dvh - 72px)" bg="#fafafa" p={24}>
                  <Stack>
                    <Group>
                      <Truck size={24} />
                      <Text>Suzuki CDD • B 1234 AS</Text>

                    </Group>
                    <Stepper classNames={{
                      verticalSeparator: stepperClass.verticalSeparatorGradient,
                      step: stepperClass.stepGradient,
                      stepIcon: stepperClass.stepIcon2,
                    }} size="sm" iconSize={20} contentPadding={0} orientation="vertical" active={
                      DriverTrackingLog.length
                    }  >
                      {
                        DriverTrackingLog.map((log, index) => {
                          return <Stepper.Step
                            mod={{
                              stepIndex: index,
                            }}
                            key={index} label={log.position || "-"} description={log.date || "-"}
                            icon={<></>}

                            completedIcon={index > 0 ? <>
                              <Text fz={10}>{index} </Text>
                            </> : <></>}
                          />;
                        })
                      }
                    </Stepper>
                  </Stack>
                </Paper>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>

      </div>
      <div className={classes.mapContainer}>
        <MapContainer center={position} zoom={10} scrollWheelZoom={false}
          style={{ minHeight: "80dvh", minWidth: "80dvw", width: "100%", height: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div >
  );
};

export default FeatureC;

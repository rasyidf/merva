import { PageHeader } from "@/components/groups/Header";
import { useFeatureFlags } from "@/contexts/FeatureProvider";
import { SegmentedControl } from "@mantine/core";
import React from "react";

type Props = {};

export const FeatureA = (props: Props) => {
	const { setActiveVersion } = useFeatureFlags();
	return <><PageHeader title="Feature A" subtitle="Hehe" />
		<SegmentedControl data={["1.0.0", "1.1.0"]} value="1.0.0" onChange={(value) => setActiveVersion(value)} />
	</>;
};

export default FeatureA;

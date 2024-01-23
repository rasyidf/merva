import { PageHeader } from "@/components/groups/Header";
import { useFeatureFlags } from "@/contexts/FeatureProvider";
import { SegmentedControl } from "@mantine/core";
import React from "react";

type Props = {};

export const FeatureA = (props: Props) => {
	return <>
		<PageHeader title="Feature A" subtitle="This is Feature A" />
	</>;
};

export default FeatureA;

import Mixpanel from "mixpanel";

export const mixpanel = process.env.NEXT_PUBLIC_MIX_PANEL_TOKEN ? Mixpanel.init(process.env.NEXT_PUBLIC_MIX_PANEL_TOKEN, {
}) : null;
export const getMixpanel = () => mixpanel;

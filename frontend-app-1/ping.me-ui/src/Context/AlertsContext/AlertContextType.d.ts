export type AlertObjectType = {
    id? : string, 
    message : string,
    template? : string, 
    type? : string,
    autoClose ?: boolean
};

export interface AlertsContextInterface {
    getAlerts : () => Array<AlertObjectType>,
    pushAlert : (alert : AlertObjectType) => void,
    removeAlert : (alertId? : string) => void,
    removeLastAlert : () => void
}
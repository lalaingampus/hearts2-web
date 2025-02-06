// normalizeRequest.ts
import USER_INFO_PACKING from "@/config/api-userInfo";

export interface RequestBody {
  CompanyCode: string;
  StartDate: string;
  EndDate: string;
  LastUpdateDate: string;
  PackListDocNo: string;
  PackListSysNo: string;
  SoDocNo: string;
  SoSysNo: string;
  WhsGroup: string;
  WhsCode: string;
  ProfitCenter: string;
  Status: string;
  DealerRepCode: string;
  DeliveryStatus: string;
  ExternalApp: string;
  UserInfo: typeof USER_INFO_PACKING;
}

// Updated normalizeRequestBody to accept dynamic parameters
export const normalizeRequestBody = (
  PackListDocNo: string,
  CompanyCode: string,
  DealerRepCode: string
): RequestBody => {
  return {
    CompanyCode: CompanyCode || '102041000', // Default to '102041000' if not provided
    StartDate: '2025-01-01',
    EndDate: '2025-13-01',
    LastUpdateDate: '',
    PackListDocNo: PackListDocNo || 'SPPC/H/01/25/00005', // Default to a given document number if not provided
    PackListSysNo: '',
    SoDocNo: '',
    SoSysNo: '',
    WhsGroup: '',
    WhsCode: '',
    ProfitCenter: '',
    Status: '',
    DealerRepCode: DealerRepCode || '01030', // Default to '01030' if not provided
    DeliveryStatus: '',
    ExternalApp: '',
    UserInfo: USER_INFO_PACKING,  // Using data from userInfo.ts
  };
};

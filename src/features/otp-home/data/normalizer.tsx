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

export const normalizeRequestBody = (): RequestBody => {
  return {
    CompanyCode: '102041000',
    StartDate: '2025-01-01',
    EndDate: '2025-13-01',
    LastUpdateDate: '',
    PackListDocNo: 'SPPC/H/01/25/00005',
    PackListSysNo: '',
    SoDocNo: '',
    SoSysNo: '',
    WhsGroup: '',
    WhsCode: '',
    ProfitCenter: '',
    Status: '',
    DealerRepCode: '01030',
    DeliveryStatus: '',
    ExternalApp: '',
    UserInfo: USER_INFO_PACKING,  // Menggunakan data UserInfo dari file userInfo.ts
  };
};

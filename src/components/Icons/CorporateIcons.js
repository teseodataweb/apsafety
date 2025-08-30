import React from 'react';

// Ícono de Riesgo Respiratorio (reemplaza ⚠️)
export const RespiratoryRiskIcon = ({ size = 48, color = "#004434" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="20" fill="#E8F5E6" stroke={color} strokeWidth="2"/>
    <path d="M24 32C29.5228 32 34 27.5228 34 22C34 16.4772 29.5228 12 24 12C18.4772 12 14 16.4772 14 22C14 27.5228 18.4772 32 24 32Z" fill="none" stroke={color} strokeWidth="2"/>
    <path d="M20 20L22 22L28 16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 26H30" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 30H28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Ícono de Impactos y Caídas (reemplaza 🏗️)
export const ImpactRiskIcon = ({ size = 48, color = "#004434" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="36" width="40" height="8" fill="#E8F5E6" stroke={color} strokeWidth="2" rx="2"/>
    <path d="M12 36V16L24 8L36 16V36" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <rect x="18" y="22" width="4" height="14" fill={color}/>
    <rect x="26" y="18" width="4" height="18" fill={color}/>
    <circle cx="24" cy="12" r="3" fill="#54AF48"/>
    <path d="M20 32L28 32" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Ícono de Riesgos Eléctricos (reemplaza ⚡)
export const ElectricalRiskIcon = ({ size = 48, color = "#004434" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="20" fill="#E8F5E6" stroke={color} strokeWidth="2"/>
    <path d="M18 20L26 12L22 24L30 28L22 36L26 24L18 20Z" fill="#54AF48" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="16" cy="16" r="2" fill={color}/>
    <circle cx="32" cy="32" r="2" fill={color}/>
  </svg>
);

// Ícono de Normativas (reemplaza 📜)
export const CertificationIcon = ({ size = 48, color = "#004434" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="6" width="32" height="36" rx="3" fill="#E8F5E6" stroke={color} strokeWidth="2"/>
    <circle cx="32" cy="18" r="8" fill="#54AF48" stroke={color} strokeWidth="2"/>
    <path d="M28 18L30 20L36 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 14H22" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 20H20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 26H24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 32H26" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Ícono de Envíos Rápidos (reemplaza 🚚)
export const FastShippingIcon = ({ size = 48, color = "#004434" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="16" width="24" height="16" rx="2" fill="#E8F5E6" stroke={color} strokeWidth="2"/>
    <path d="M28 20H36L40 24V32H36" fill="#E8F5E6" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <circle cx="12" cy="36" r="4" fill="white" stroke={color} strokeWidth="2"/>
    <circle cx="32" cy="36" r="4" fill="white" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="36" r="2" fill="#54AF48"/>
    <circle cx="32" cy="36" r="2" fill="#54AF48"/>
    <path d="M8 12L12 8L16 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Ícono de Soporte Técnico (reemplaza 🛠️)
export const TechnicalSupportIcon = ({ size = 48, color = "#004434" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18" fill="#E8F5E6" stroke={color} strokeWidth="2"/>
    <path d="M16 20L20 16L28 24L20 32L16 28" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="22" y="14" width="12" height="4" rx="2" fill="#54AF48" stroke={color} strokeWidth="1"/>
    <path d="M32 16L36 20L32 24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="24" r="3" fill="white" stroke={color} strokeWidth="2"/>
    <circle cx="24" cy="24" r="1" fill="#54AF48"/>
  </svg>
);

// Ícono de Fabricación Nacional (reemplaza 🏭)
export const ManufacturingIcon = ({ size = 48, color = "#004434" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="24" width="36" height="16" fill="#E8F5E6" stroke={color} strokeWidth="2" rx="2"/>
    <rect x="12" y="16" width="6" height="8" fill="#54AF48" stroke={color} strokeWidth="1"/>
    <rect x="20" y="12" width="6" height="12" fill="#54AF48" stroke={color} strokeWidth="1"/>
    <rect x="28" y="8" width="6" height="16" fill="#54AF48" stroke={color} strokeWidth="1"/>
    <path d="M10 28H14M18 28H22M26 28H30M34 28H38" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 32H14M18 32H22M26 32H30M34 32H38" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 36H14M18 36H22M26 36H30M34 36H38" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Ícono de Respiradores
export const RespiratorsIcon = ({ size = 48, color = "#004434" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="28" rx="16" ry="12" fill="#E8F5E6" stroke={color} strokeWidth="2"/>
    <circle cx="18" cy="20" r="6" fill="white" stroke={color} strokeWidth="2"/>
    <circle cx="30" cy="20" r="6" fill="white" stroke={color} strokeWidth="2"/>
    <path d="M24 32C26 32 28 30 28 28C28 26 26 24 24 24C22 24 20 26 20 28C20 30 22 32 24 32Z" fill="#54AF48" stroke={color} strokeWidth="1"/>
    <circle cx="18" cy="20" r="3" fill="#54AF48"/>
    <circle cx="30" cy="20" r="3" fill="#54AF48"/>
    <path d="M10 24C12 22 14 22 16 24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 24C34 22 36 22 38 24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Ícono de Cascos
export const HelmetsIcon = ({ size = 48, color = "#004434" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8C16 8 10 14 10 22V32H38V22C38 14 32 8 24 8Z" fill="#E8F5E6" stroke={color} strokeWidth="2"/>
    <path d="M10 32C10 36 13 40 17 40H31C35 40 38 36 38 32" stroke={color} strokeWidth="2"/>
    <ellipse cx="24" cy="18" rx="8" ry="4" fill="#54AF48"/>
    <circle cx="20" cy="16" r="1" fill="white"/>
    <circle cx="28" cy="16" r="1" fill="white"/>
    <path d="M14 26H34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <rect x="22" y="12" width="4" height="6" fill="white" stroke={color} strokeWidth="1" rx="1"/>
  </svg>
);

// Ícono de Protección Ocular
export const EyeProtectionIcon = ({ size = 48, color = "#004434" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 24C8 24 14 16 24 16C34 16 40 24 40 24C40 24 34 32 24 32C14 32 8 24 8 24Z" fill="#E8F5E6" stroke={color} strokeWidth="2"/>
    <ellipse cx="18" cy="24" rx="6" ry="8" fill="white" stroke={color} strokeWidth="2"/>
    <ellipse cx="30" cy="24" rx="6" ry="8" fill="white" stroke={color} strokeWidth="2"/>
    <circle cx="18" cy="24" r="4" fill="#54AF48"/>
    <circle cx="30" cy="24" r="4" fill="#54AF48"/>
    <circle cx="18" cy="22" r="1" fill="white"/>
    <circle cx="30" cy="22" r="1" fill="white"/>
    <path d="M4 20L8 24L4 28" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M44 20L40 24L44 28" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Ícono de Guantes
export const GlovesIcon = ({ size = 48, color = "#004434" }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 40V28C12 24 15 20 19 20H20C21 20 22 19 22 18V12C22 10 23 8 25 8C27 8 28 10 28 12V18" fill="#E8F5E6" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <path d="M28 18V14C28 12 29 10 31 10C33 10 34 12 34 14V20" fill="#E8F5E6" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <path d="M34 20V16C34 14 35 12 37 12C39 12 40 14 40 16V24" fill="#E8F5E6" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
    <path d="M40 24V32C40 36 37 40 33 40H15C13 40 12 39 12 37" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="26" cy="30" r="3" fill="#54AF48"/>
    <path d="M16 32H20M24 32H28M32 32H36" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Componente contenedor para todos los íconos
export const CorporateIconsLibrary = {
  RespiratoryRisk: RespiratoryRiskIcon,
  ImpactRisk: ImpactRiskIcon,
  ElectricalRisk: ElectricalRiskIcon,
  Certification: CertificationIcon,
  FastShipping: FastShippingIcon,
  TechnicalSupport: TechnicalSupportIcon,
  Manufacturing: ManufacturingIcon,
  Respirators: RespiratorsIcon,
  Helmets: HelmetsIcon,
  EyeProtection: EyeProtectionIcon,
  Gloves: GlovesIcon
};
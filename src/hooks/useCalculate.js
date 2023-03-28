export const calculateExperience = (proponente, infoGeneral) => {
  let experience;
  let calculatedExperience;
  experience =
    proponente.experience /
    (infoGeneral.budget * (proponente.participation / 100));

  switch (true) {
    case experience >= 0 && experience <= 3:
      calculatedExperience = 60;
      break;
    case experience > 3 && experience <= 6:
      calculatedExperience = 80;
      break;
    case experience > 6 && experience <= 10:
      calculatedExperience = 100;
      break;
    default:
      calculatedExperience = 120;
      break;
  }
  return calculatedExperience;
};

export const calculateTecniqueCapability = (proponente) => {
  let tecnicCapability = proponente.tecnicCapability;
  let calculatedTecnicCapability;
  switch (true) {
    case tecnicCapability >= 0 && tecnicCapability <= 3:
      calculatedTecnicCapability = 20;
      break;
    case tecnicCapability > 6 && tecnicCapability <= 9:
      calculatedTecnicCapability = 30;
      break;
    default:
      calculatedTecnicCapability = 40;
      break;
  }
  return calculatedTecnicCapability;
};

export const calculateFinancialCapability = (proponente) => {
  let financialCapability = proponente.financialCapability;
  let calculatedFinancialCapability;
  switch (true) {
    case financialCapability >= 0 && financialCapability <= 0.5:
      calculatedFinancialCapability = 20;
      break;
    case financialCapability > 0.5 && financialCapability <= 0.75:
      calculatedFinancialCapability = 25;
      break;
    case financialCapability > 0.75 && financialCapability <= 1:
      calculatedFinancialCapability = 30;
      break;
    case financialCapability > 1 && financialCapability <= 1.5:
      calculatedFinancialCapability = 35;
      break;
    default:
      calculatedFinancialCapability = 40;
      break;
  }
  return calculatedFinancialCapability;
};

export const calculateSCE = (proponente, infoGeneral) => {
  const presentationDate = new Date(infoGeneral.presentationDate);
  let sce = 0;

  proponente.contracts?.map((contrato) => {
    const startDate = new Date(contrato.startDate);
    const suspentionDate = new Date(contrato.suspentionDate);
    let executedDays;

    if (contrato.isSuspended === "No") {
      executedDays = presentationDate.getTime() - startDate.getTime();
    } else {
      executedDays = suspentionDate.getTime() - startDate.getTime();
    }
    executedDays = executedDays / (1000 * 3600 * 24);

    const executionDaysLeft = contrato.term * 30 - executedDays;

    const dailyBalanceExecution =
      Number(contrato.contractPrice) / (Number(contrato.term) * 30);

    sce +=
      (dailyBalanceExecution * executionDaysLeft * contrato.participation) /
      100;
  });

  return Math.round(sce);
};

export const calculateKResidual = (proponente, infoGeneral) => {
  const {
    bestIncome,
    experienceValue,
    financialCapabilityValue,
    tecnicCapabilityValue,
    sce,
  } = proponente;

  const kresidual =
    bestIncome *
      ((experienceValue + financialCapabilityValue + tecnicCapabilityValue) /
        100) -
    sce;

  // if (kresidual > infoGeneral.budget * infoGeneral.advance) {
  //   infoGeneral.acepted = true;
  // } else {
  //   infoGeneral.acepted = false;
  // }
  return kresidual;
};

export const scrollToElement = (id) => {
  const element = document.getElementById(id);
  // console.log(element);
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "nearest",
  });
};

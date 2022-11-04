export const configurationFields = [
  {
    label: 'Name of specification',
    type: 'text',
    field: 'name',
    placeholder: '',
    required: true,
  },
  {
    label: 'Engine',
    type: 'select',
    field: 'engine',
    placeholder: 'Engine',
    options: ['v4 1.8 L', 'v4 2.0 L', 'V6 3.0 L'],
    required: true,
  },
  {
    label: 'Interior material',
    type: 'select',
    field: 'interiorMaterial',
    placeholder: 'Interior material',
    options: ['Cloth', 'Leather'],
    required: true,
  },
  {
    label: 'Color',
    type: 'select',
    field: 'color',
    placeholder: 'Color',
    options: ['Black', 'Red', 'Blue', 'White'],
    required: true,
  },
  {
    label: 'Wheel rims',
    type: 'select',
    field: 'wheelRims',
    placeholder: 'Wheel rims',
    options: ['16 inches', '18 inches', '20 inches'],
    required: true,
  },
  {
    label: 'Type of wheels',
    type: 'select',
    field: 'wheelsType',
    placeholder: 'Wheel rims',
    options: ['BBS', 'AAC', 'Other'],
    required: true,
  },
  {
    label: 'Air suspension',
    type: 'checkbox',
    field: 'airSuspension',
      required: true,
  },
  {
    label: 'Signature on hood',
    type: 'text',
    field: 'signatureOnHood',
    placeholder: 'Signature on hood',
    required: true,
  },
]

export const specificationList = [
  {
    id: 1,
    name: 'test 1',
    engine: 'v4 1.8 L',
    interiorMaterial: 'Leather',
    color: 'Red',
    wheelRims: '18 inches',
    wheelsType: 'BBS',
    airSuspension: true,
    signatureOnHood: 'test hood',
  }
]
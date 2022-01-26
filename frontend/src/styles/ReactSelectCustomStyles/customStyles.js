const customStyles = {
  container: provided => ({
    ...provided,
    margin: '16px 0',
    border: '1px solid #8a8a8a',
    borderRadius: '8px',
  }),
  option: provided => ({
    ...provided,
    background: '#2A2E32',
    color: '#A0A0A0',
    border: 'none',
    borderRadius: '26px',
    fontWeight: 300,
    cursor: 'pointer',
  }),
  valueContainer: provided => ({
    ...provided,
    border: '2px solid transparent',
    borderRadius: '8px',
    background: '#2A2E32',
    minHeight: '52px',
    cursor: 'pointer',
  }),
  control: provided => ({
    ...provided,
    backgroundColor: 'transparent',
    border: 'none',
    minWidth: 300,
    cursor: 'pointer',
  }),
  menu: provided => ({
    ...provided,
    backgroundColor: '#2a2e32',
    border: '1px solid #8a8a8a',
    borderRadius: '8px',
    position: 'absolute',
    left: '-1px',
  }),
  multiValue: provided => ({
    ...provided,
    background: 'transparent',
    color: '#a0a0a0',
    border: '1px solid #8a8a8a',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 14px',
    borderRadius: '27px',
  }),
  multiValueLabel: provided => ({
    ...provided,
    color: '#a0a0a0',
    textTransform: 'uppercase',
  }),
  multiValueRemove: provided => ({
    ...provided,
    background: 'transparent',
    '&:hover': {
      color: '#e62a2a',
      backgroundColor: 'transparent',
      transform: 'scale(1.5)',
    },
  }),
  clearIndicator: provided => ({
    ...provided,
    background: 'transparent',
    color: '#8a8a8a',
    '&:hover': {
      color: '#e62a2a',
      backgroundColor: 'transparent',
      transform: 'scale(1.5)',
    },
  }),
  indicatorscontainer: provided => ({
    ...provided,
    background: 'transparent',
  }),
  placeholder: provided => ({
    ...provided,
    color: '#A0A0A0',
    fontWeight: 300,
    fontSize: '16px',
    fontFamily: 'Poppins',
    letterSpacing: '0.48px',
  }),
  indicatorSeparator: provided => ({
    ...provided,
    display: 'none',
  }),
  input: () => ({
    color: '#A0A0A0',
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: '#8a8a8a',
    '&:hover': {
      color: '#8a8a8a',
      backgroundColor: 'transparent',
      transform: 'scale(1.5)',
    },
  }),
}

export default customStyles

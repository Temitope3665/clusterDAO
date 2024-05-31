const ElementBlock = ({  element: Comp, form }:{ element: any, form: any }) => {
  return <Comp form={form} />;
};

export default ElementBlock
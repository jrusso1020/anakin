exports.onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  replaceHeadComponents(getHeadComponents()
    .filter(({ type, props: { href } = {}}) => type !== 'link' || href))
};

const SiteLayout = ({ children }) => <div>{/* ... */}</div>

export const getLayout = page => <SiteLayout><div className="blockLevel">{page}</div></SiteLayout>

export default SiteLayout
import AuthGuard from "@/components/AuthGuard";

export default function UnauthLayout({ children }) {
    return (
        <AuthGuard authNeeded={false}>
            {children}
        </AuthGuard>
    );
}
import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-primary border-4 border-black p-6 shadow-[12px_12px_0px_black] transform rotate-2 inline-block mb-6">
            <h1 className="text-2xl md:text-4xl font-black text-black uppercase tracking-wider">
              WELCOME BACK!
            </h1>
          </div>
          <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_black] transform -rotate-1">
            <p className="text-lg font-bold text-black uppercase tracking-wide">
              SIGN IN TO ACCESS YOUR ACCOUNT & API DOCS!
            </p>
          </div>
        </div>

        {/* Clerk SignIn Component with Custom Styling */}
        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_black] p-8 transform rotate-1">
          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none border-none p-0",
                headerTitle: "text-2xl font-black text-black uppercase tracking-wider mb-4",
                headerSubtitle: "text-black font-bold uppercase tracking-wide mb-6",
                socialButtonsBlockButton: "bg-secondary text-black border-4 border-black font-black uppercase tracking-wide shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-75 mb-4",
                socialButtonsBlockButtonText: "text-black font-black uppercase",
                dividerLine: "bg-black h-1",
                dividerText: "text-black font-black uppercase tracking-wide",
                formFieldLabel: "text-black font-black uppercase tracking-wide mb-2",
                formFieldInput: "bg-white border-4 border-black shadow-[inset_4px_4px_0px_#f0f0f0] font-bold p-4 focus:shadow-[inset_4px_4px_0px_#00ff00] focus:outline-none",
                formButtonPrimary: "bg-accent text-white border-4 border-black font-black uppercase tracking-wider shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-75 py-4",
                footerActionLink: "text-primary font-black uppercase tracking-wide hover:text-accent transition-colors",
                identityPreviewText: "text-black font-bold uppercase",
                identityPreviewEditButton: "text-primary font-black uppercase hover:text-accent",
                formResendCodeLink: "text-primary font-black uppercase hover:text-accent",
                otpCodeFieldInput: "bg-white border-4 border-black font-bold text-center text-xl",
                formFieldSuccessText: "text-primary font-bold uppercase",
                formFieldErrorText: "text-destructive font-bold uppercase",
                alertClerkError: "bg-destructive border-4 border-black text-white font-bold uppercase p-4 shadow-[4px_4px_0px_black]"
              },
              layout: {
                socialButtonsPlacement: "top"
              }
            }}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <div className="bg-secondary border-4 border-black p-4 shadow-[8px_8px_0px_black] transform -rotate-1">
            <p className="text-black font-bold uppercase tracking-wide">
              🚀 JOIN THOUSANDS OF JOB SEEKERS USING OPENHIRE!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
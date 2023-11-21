"use client";
import { UndrawContractSvg } from "@lms/components/composables/lsp-modal/UndrawContractSvg";
import { Button } from "@lms/components/osprey/ui/button/view/Button";
import { InputGroup } from "@lms/components/osprey/ui/input-group/view/InputGroup";
import { Input } from "@lms/components/osprey/ui/input/view/Input";
import { Modal, ModalTrigger, ModalContent } from "@lms/components/osprey/ui/overlays/modal/view/Modal";
import { useEffect, useState } from "react";

type ExpertiseMutation = {
  isShowing: boolean;
  type: null | "add" | "edit";
};

export const AddTrainingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [expertiseMutation, setExpertiseMutation] = useState<ExpertiseMutation>({ isShowing: false, type: null });

  return (
    <>
      <Button
        className="mb-2"
        size="small"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add New
      </Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} size="lg" isStatic={true}>
        <ModalTrigger asChild></ModalTrigger>
        <ModalContent>
          <ModalContent.Title>
            <h3 className="text-2xl text-gray-700 font-semibold">Training</h3>
            <p className="text-gray-500">Add new external training/seminar</p>
            <p className="text-xs text-indigo-500 font-medium">{page} of 3</p>
          </ModalContent.Title>
          <ModalContent.Body>
            {page === 1 && (
              <div className="grid grid-rows-4 grid-cols-3 gap-1 gap-x-3 px-1">
                <div className="col-span-2">
                  <div>Course Title:</div>
                  <Input placeholder="Enter course title" />
                </div>
                <div className="row-span-3 border-dashed border-2 border-indigo-100 rounded-lg cursor-pointer">
                  <div className="flex h-full items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      viewBox="0 0 782.04441 701.88002"
                      className="h-36 w-36"
                    >
                      <path
                        d="M609.48783,100.59015l-25.44631,6.56209L270.53735,187.9987,245.091,194.56079A48.17927,48.17927,0,0,0,210.508,253.17865L320.849,681.05606a48.17924,48.17924,0,0,0,58.61776,34.58317l.06572-.01695,364.26536-93.93675.06572-.01695a48.17923,48.17923,0,0,0,34.58309-58.6178l-110.341-427.87741A48.17928,48.17928,0,0,0,609.48783,100.59015Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#f2f2f2"
                      />
                      <path
                        d="M612.94784,114.00532l-30.13945,7.77236L278.68955,200.20385l-30.139,7.77223a34.30949,34.30949,0,0,0-24.6275,41.74308l110.341,427.87741a34.30946,34.30946,0,0,0,41.7431,24.62736l.06572-.01695,364.26536-93.93674.06619-.01707a34.30935,34.30935,0,0,0,24.627-41.7429l-110.341-427.87741A34.30938,34.30938,0,0,0,612.94784,114.00532Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#fff"
                      />
                      <path
                        d="M590.19,252.56327,405.917,300.08359a8.01411,8.01411,0,0,1-4.00241-15.52046l184.273-47.52033A8.01412,8.01412,0,0,1,590.19,252.56327Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#f2f2f2"
                      />
                      <path
                        d="M628.955,270.49906,412.671,326.27437a8.01411,8.01411,0,1,1-4.00241-15.52046l216.284-55.77531a8.01411,8.01411,0,0,1,4.00242,15.52046Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#f2f2f2"
                      />
                      <path
                        d="M620.45825,369.93676l-184.273,47.52032a8.01411,8.01411,0,1,1-4.00242-15.52046l184.273-47.52032a8.01411,8.01411,0,1,1,4.00241,15.52046Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#f2f2f2"
                      />
                      <path
                        d="M659.22329,387.87255l-216.284,55.77531a8.01411,8.01411,0,1,1-4.00242-15.52046l216.284-55.77531a8.01411,8.01411,0,0,1,4.00242,15.52046Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#f2f2f2"
                      />
                      <path
                        d="M650.72653,487.31025l-184.273,47.52033a8.01412,8.01412,0,0,1-4.00242-15.52047l184.273-47.52032a8.01411,8.01411,0,0,1,4.00242,15.52046Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#f2f2f2"
                      />
                      <path
                        d="M689.49156,505.246l-216.284,55.77532a8.01412,8.01412,0,1,1-4.00241-15.52047l216.284-55.77531a8.01411,8.01411,0,0,1,4.00242,15.52046Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#f2f2f2"
                      />
                      <path
                        d="M374.45884,348.80871l-65.21246,16.817a3.847,3.847,0,0,1-4.68062-2.76146L289.5963,304.81607a3.847,3.847,0,0,1,2.76145-4.68061l65.21247-16.817a3.847,3.847,0,0,1,4.68061,2.76145l14.96947,58.04817A3.847,3.847,0,0,1,374.45884,348.80871Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M404.72712,466.1822l-65.21247,16.817a3.847,3.847,0,0,1-4.68062-2.76146l-14.96946-58.04816A3.847,3.847,0,0,1,322.626,417.509l65.21246-16.817a3.847,3.847,0,0,1,4.68062,2.76145l14.96946,58.04817A3.847,3.847,0,0,1,404.72712,466.1822Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M434.99539,583.55569l-65.21246,16.817a3.847,3.847,0,0,1-4.68062-2.76145l-14.96946-58.04817a3.847,3.847,0,0,1,2.76145-4.68062l65.21247-16.817a3.847,3.847,0,0,1,4.68061,2.76146l14.96947,58.04816A3.847,3.847,0,0,1,434.99539,583.55569Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M863.63647,209.0517H487.31811a48.17928,48.17928,0,0,0-48.125,48.12512V699.05261a48.17924,48.17924,0,0,0,48.125,48.12507H863.63647a48.17924,48.17924,0,0,0,48.125-48.12507V257.17682A48.17928,48.17928,0,0,0,863.63647,209.0517Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M863.637,222.90589H487.31811a34.30948,34.30948,0,0,0-34.271,34.27093V699.05261a34.30947,34.30947,0,0,0,34.271,34.27088H863.637a34.30936,34.30936,0,0,0,34.27051-34.27088V257.17682A34.30937,34.30937,0,0,0,863.637,222.90589Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#fff"
                      />
                      <circle cx="694.19401" cy="614.02963" r="87.85039" fill="#6c63ff" />
                      <path
                        d="M945.18722,701.63087H914.63056V671.07421a11.45875,11.45875,0,0,0-22.9175,0v30.55666H861.1564a11.45875,11.45875,0,0,0,0,22.9175h30.55666V755.105a11.45875,11.45875,0,1,0,22.9175,0V724.54837h30.55666a11.45875,11.45875,0,0,0,0-22.9175Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#fff"
                      />
                      <path
                        d="M807.00068,465.71551H616.699a8.01412,8.01412,0,1,1,0-16.02823H807.00068a8.01412,8.01412,0,0,1,0,16.02823Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M840.05889,492.76314H616.699a8.01412,8.01412,0,1,1,0-16.02823H840.05889a8.01411,8.01411,0,1,1,0,16.02823Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M807.00068,586.929H616.699a8.01412,8.01412,0,1,1,0-16.02823H807.00068a8.01411,8.01411,0,0,1,0,16.02823Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M840.05889,613.97661H616.699a8.01412,8.01412,0,1,1,0-16.02823H840.05889a8.01412,8.01412,0,1,1,0,16.02823Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M574.07028,505.04162H506.72434a3.847,3.847,0,0,1-3.84278-3.84278V441.25158a3.847,3.847,0,0,1,3.84278-3.84278h67.34594a3.847,3.847,0,0,1,3.84278,3.84278v59.94726A3.847,3.847,0,0,1,574.07028,505.04162Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M574.07028,626.25509H506.72434a3.847,3.847,0,0,1-3.84278-3.84278V562.46505a3.847,3.847,0,0,1,3.84278-3.84278h67.34594a3.847,3.847,0,0,1,3.84278,3.84278v59.94726A3.847,3.847,0,0,1,574.07028,626.25509Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#e6e6e6"
                      />
                      <path
                        d="M807.21185,330.781H666.91017a8.01411,8.01411,0,0,1,0-16.02823H807.21185a8.01411,8.01411,0,0,1,0,16.02823Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#ccc"
                      />
                      <path
                        d="M840.27007,357.82862H666.91017a8.01411,8.01411,0,1,1,0-16.02822h173.3599a8.01411,8.01411,0,0,1,0,16.02822Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#ccc"
                      />
                      <path
                        d="M635.85911,390.6071H506.51316a3.847,3.847,0,0,1-3.84277-3.84277V285.81706a3.847,3.847,0,0,1,3.84277-3.84277H635.85911a3.847,3.847,0,0,1,3.84277,3.84277V386.76433A3.847,3.847,0,0,1,635.85911,390.6071Z"
                        transform="translate(-208.9778 -99.05999)"
                        fill="#6c63ff"
                      />
                    </svg>
                  </div>
                </div>
                <div className="col-span-2">
                  <div>Facilitator:</div>
                  <Input placeholder="Enter facilitator" />
                </div>
                <div className="col-span-2">
                  <div>Location:</div>
                  <Input placeholder="Enter location" />
                </div>
                <div className="col-span-1">
                  <div>Duration:</div>
                  <Input placeholder="Enter duration" />
                </div>
                <div className="col-span-1">
                  <div>From:</div>
                  <Input type="date" />
                </div>
                <div className="col-span-1">
                  <div>To:</div>
                  <Input type="date" />
                </div>
                {/* <div className="col-span-3 ">
                <div>Course Content:</div>
              </div>
              <div className="col-span-3 bg-cyan-50">
                <InputGroup />
              </div> */}
              </div>
            )}
            {page === 2 && (
              <div>
                <div className="flex justify-between mb-2">
                  <div>Course Content:</div>
                  <div>
                    <button
                      className="flex items-center justify-center h-5 w-5 hover:bg-gray-100 transition-colors rounded"
                      onClick={() => {
                        setExpertiseMutation({ isShowing: true, type: "add" });
                        // setExpertiseVal("");
                        // expertiseInputRef?.current?.focus();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-14- h-14 text-gray-700"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                    </button>
                  </div>
                </div>
                {expertiseMutation.isShowing ? (
                  <div className="flex">
                    <Input />
                    <Button variant="soft" color="primary">
                      /
                    </Button>
                    <Button variant="soft" color="danger">
                      x
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 bg-gray-50/50 rounded-lg border-dashed w-full flex items-center justify-center p-4">
                    <UndrawContractSvg />
                  </div>
                )}
              </div>
            )}
            {page === 3 && (
              <div>
                <div className="flex justify-between mb-2">
                  <div>Qualification of Nominees:</div>
                  <div>
                    <Button size="small">Add</Button>
                  </div>
                </div>
                <div className="border-2 bg-gray-50/50 rounded-lg border-dashed w-full flex items-center justify-center p-4">
                  <UndrawContractSvg />
                </div>
              </div>
            )}
            {page === 4 && (
              <InputGroup
                placeholder="Add New Item"
                // startIcon={
                //   <svg
                //     className="h-4 w-4 text-gray-400"
                //     xmlns="http://www.w3.org/2000/svg"
                //     width="16"
                //     height="16"
                //     fill="currentColor"
                //     viewBox="0 0 16 16"
                //   >
                //     <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                //   </svg>
                // }
              >
                + Add New
              </InputGroup>
            )}
          </ModalContent.Body>
          <ModalContent.Footer>
            <div className="flex items-center justify-end gap-2 py-1">
              <Button
                variant="outline"
                onClick={() => {
                  // page === 11 ? lspDataTableMutation.mutate() :
                  setPage(page - 1);
                }}
              >
                Previous
              </Button>
              <Button
                onClick={() => {
                  // page === 11 ? lspDataTableMutation.mutate() :
                  setPage(page + 1);
                }}
              >
                Next
              </Button>
            </div>
          </ModalContent.Footer>
        </ModalContent>
      </Modal>
    </>
  );
};

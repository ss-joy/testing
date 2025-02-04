import React from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
function redix() {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="border-2 text-red-700 text-3xl hover:bg-blue-400 p-3 rounded-2xl">
          dialog me
        </DialogTrigger>
        <DialogContent className="flex flex-col gap-[28px] items-center w-[95%] max-w-[1080px] h-[862px] rounded-[32px] border-4 border-blue-700 overflow-hidden p-8 bg-[rgba(0,148,255,0.5)]">
          <DialogHeader className="self-start border text-white h-[35px] text-[30px] font-[700] border-red-700 p-0 flex justify-start items-center">
            <DialogTitle className=" h-[35px] text-[30px] font-[700] flex justify-start items-center">
              My Story
            </DialogTitle>
          </DialogHeader>
          <hr className="border-[1px] border-main-sky5 opacity-50 max-w-full w-[95%]"></hr>
          <div className="w-[95%] max-w-[1016px] max-h-[290px] h-[290px] rounded-[32px] border-[#007EF5] border-[2px] border-dashed"></div>
          <div className="border w-[95%] max-w-[1016px]  h-[303px]">
            <div className="h-[57px] border"></div>
            <div className="h-[247px] border"></div>
          </div>
          <DialogFooter className="border bg-transparent w-full">
            <Button
              type="submit"
              className="xxxx mt-auto w-[1010px] max-w-full rounded-[12px] text-[rgba(255,255,255,1)] bg-[rgba(0,126,245,1)] h-[45px] text-[14px] font-[700] uppercase"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default redix;

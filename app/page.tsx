'use client'
import { Input } from "@/components/ui/input";
import { M_PLUS_1 } from "next/font/google";
import Image from "next/image";
import React, { ReactHTMLElement, useEffect, useRef, useState } from "react";

export default function Page() {
    const [input, setInput] = useState<number[]>([4, 4, 20]);
    const [output, setOutput] = useState<number[]>([0, 0, 0]);
    const [modulo, setModulo] = useState<number>(input[2] + 1);
    const inputString = ['x', 'y', 'z'];

    const handleChange = (e: React.FormEvent<HTMLInputElement>, i: number) => {
        let inputBaru: number[] = [...input];
        inputBaru[i] = Number(e.currentTarget.value);
        if (i == 2) {
            setModulo(inputBaru[i] + 1);
        }

        setInput(inputBaru);
    }

    const handleClick = () => {
        let outputBaru: number[] = [...output];
        for (let x = 0; x < outputBaru.length; x++) {
            outputBaru[x] = Math.floor(Math.random() * Math.pow(10, Math.ceil(Math.log10(input[x]))) % input[x] + 1);
        }

        setOutput(outputBaru);
    }

    const inputXYZ = Array.from({ length: inputString.length }, (_, i) => {
        return (
            <div key={i} className="flex justify-center items-center  border-white p-5">
                <div className="flex w-auto h-auto">
                    <h1 className="text-white text-[50px] font-bold">
                        {inputString[i]}:
                    </h1>
                    <Input
                        className="ml-5 mt-4 h-[50px] w-[60px] text-white text-[20px]"
                        value={input[i]}
                        onChange={(e) => handleChange(e, i)}
                    >
                    </Input>
                </div>
            </div>
        )
    })

    const outputXYZ = Array.from({ length: output.length }, (_, i) => {
        return (
            <div key={i} className="flex justify-center items-center">
                <h1 className="text-[60px] text-white font-bold">
                    {output[i]}
                </h1>
            </div>
        )
    })

    return (
        <>
            <div className="justify-items-center bg-black min-h-screen w-full">
                <div className=" border-white grid grid-cols-3 h-[200px] w-full">
                    {inputXYZ}
                </div>

                <div className="w-full h-[100px] flex justify-center items-center gap-2 mt-15">
                    <button
                        className="relative w-[200px] h-[100px] bg-white rounded-2xl text-[30px] text-black font-bold"
                        onClick={() => handleClick()}
                    >
                        Randomize
                    </button>
                    <div className="border-white w-[200px] h-full flex justify-center items-center">
                        <h1 className="text-white text-[20px] font-bold">
                            mod:
                        </h1>
                        <Input
                            className="ml-3 h-1/2 w-1/2"
                            value={modulo}
                            onChange={(e) => {
                                setModulo(Number(e.currentTarget.value));
                            }}
                        >
                        </Input>
                    </div>
                    <button
                        className="bg-white text-black font-bold h-1/2 w-[100px] rounded-2xl"
                        onClick={() => {
                            let outputBaru:number[] = [...output];
                            outputBaru[2] = outputBaru[2] % modulo + 1;
                            setOutput(outputBaru);
                        }}
                    >
                        mod
                    </button>
                </div>

                <div className="h-[300px] w-[1000px] mt-5 grid grid-cols-3 border-white">
                    {outputXYZ}
                </div>
            </div>
        </>
    )
}
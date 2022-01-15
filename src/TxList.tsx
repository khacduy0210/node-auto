import React from "react";

export default function TxList (txs: any) {
    if (txs.length === 0) return null;

    return (
    <>
        {txs?.map((item: any) => (
          <div key={item} className="alert alert-info mt-5">
            <div className="flex-1">
              <label>{item.hash}</label>
            </div>
          </div>
        ))}
    </>
    );
}
  
import { QueryKeys } from "@/constants";
import { searchProducts } from "@/services/productsService";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export const useProducts = () => {
  const [searchKey, setSearchKey] = useState<string | undefined>(undefined);
  const [classify, setClassify] = useState<number | undefined>(undefined);

  const { data, isPending, error } = useQuery({
    queryKey: [QueryKeys.products, searchKey, classify],
    queryFn: () => searchProducts({ search: searchKey, classifyId: classify }),
  });

  const updateSearchKey = (searchKey: string) => {
    searchKey = searchKey.trim();

    if (searchKey == "") {
      setSearchKey(undefined);

      return;
    }

    setSearchKey(searchKey);
  }

  const updateClassify = (classifyId: number) => {

    setClassify(classifyId);
  }

  return { data, isLoading:isPending, error, updateSearchKey, updateClassify };
};

<!--
  - coding=utf-8
  - Copyright 2021-present, the Recognai S.L. team.
  -
  - Licensed under the Apache License, Version 2.0 (the "License");
  - you may not use this file except in compliance with the License.
  - You may obtain a copy of the License at
  -
  -     http://www.apache.org/licenses/LICENSE-2.0
  -
  - Unless required by applicable law or agreed to in writing, software
  - distributed under the License is distributed on an "AS IS" BASIS,
  - WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  - See the License for the specific language governing permissions and
  - limitations under the License.
  -->

<template>
  <div class="header__filters">
    <filters-area
      :dataset="dataset"
      :datasetId="datasetId"
      :datasetName="datasetName"
      :datasetTask="datasetTask"
      :enableSimilaritySearch="enableSimilaritySearch"
      @search-records="searchRecords"
    />
    <entities-header :labels="labels" />
    <global-actions
      :datasetId="datasetId"
      :datasetName="datasetName"
      :datasetTask="datasetTask"
      :datasetVisibleRecords="dataset.visibleRecords"
      @discard-records="onDiscard"
      @validate-records="onValidate"
      @clear-records="onClear"
      @reset-records="onReset"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getDatasetFromORM } from "@/models/dataset.utilities";
import {
  getAllLabelsByDatasetId,
  getAllLabelsTextByDatasetId,
} from "@/models/globalLabel.queries";

export default {
  props: {
    datasetId: {
      type: Array,
      required: true,
    },
    datasetName: {
      type: String,
      required: true,
    },
    datasetTask: {
      type: String,
      required: true,
    },
    enableSimilaritySearch: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isSortAsc: true,
      sortBy: "order",
    };
  },
  computed: {
    dataset() {
      //TODO when refactor of filter part from header, remove this computed/and get only what is necessary as props
      return getDatasetFromORM(this.datasetId, this.datasetTask, true);
    },
    labels() {
      return getAllLabelsByDatasetId(
        this.datasetId,
        this.sortBy,
        this.isSortAsc
      );
    },
    listOfTexts() {
      return getAllLabelsTextByDatasetId(
        this.datasetId,
        this.sortBy,
        this.isSortAsc
      );
    },
  },
  methods: {
    ...mapActions({
      discard: "entities/datasets/discardAnnotations",
      validate: "entities/datasets/validateAnnotations",
      updateRecords: "entities/datasets/updateDatasetRecords",
      resetRecords: "entities/datasets/resetRecords",
    }),

    async onDiscard(records) {
      await this.discard({
        dataset: this.dataset,
        records: records,
      });
    },
    async onValidate(records) {
      try {
        await this.validate({
          dataset: this.dataset,
          agent: this.$auth.user.username,
          records: records.map((record) => {
            return {
              ...record,
              annotatedEntities: undefined,
              annotation: {
                entities: record.annotatedEntities,
              },
            };
          }),
        });
      } catch (err) {
        console.log(err);
      }
    },
    async onClear(records) {
      const clearedRecords = records.map((record) => {
        return {
          ...record,
          annotatedEntities: [],
          annotation: null,
          selected: true,
          status: "Edited",
        };
      });
      await this.updateRecords({
        dataset: this.dataset,
        records: clearedRecords,
      });
    },
    async onReset(records) {
      const restartedRecords = records.map((record) => {
        return {
          ...record,
          annotatedEntities: record.annotation?.entities,
        };
      });
      await this.resetRecords({
        dataset: this.dataset,
        records: restartedRecords,
      });
    },
    searchRecords(query) {
      this.$emit("search-records", query);
    },
  },
};
</script>

<template>
  <div class="filter__similarity">
    <div
      v-if="filterIsActive"
      id="filter-active"
      class="filter__similarity__content"
      :class="filterIsActive ? '--active' : null"
      data-title="Remove similar records filter"
    >
      <base-button
        class="filter__similarity__button"
        @click="removeSimilarityFilter"
      >
        <svgicon width="14" height="14" name="close"></svgicon>
      </base-button>
      <svgicon
        class="filter__similarity__icon"
        width="28"
        height="28"
        name="similarity"
      ></svgicon>
    </div>
    <div v-else class="filter__similarity__content">
      <div
        data-title="If you have vectors in your records, you can find the most similar records to a given one"
      >
        <svgicon
          class="filter__similarity__icon"
          width="28"
          height="28"
          name="similarity"
        ></svgicon>
      </div>
      <div>
        <span class="filter__similarity__new">NEW</span>
      </div>
    </div>
  </div>
</template>

<script>
import "assets/icons/close";
import "assets/icons/similarity";
export default {
  data() {
    return {
      dropdownIsvisible: false,
      selectedVector: {},
    };
  },
  props: {
    filterIsActive: {
      type: Boolean,
    },
  },
  methods: {
    removeSimilarityFilter() {
      this.$emit("search-records", { vector: null });
    },
  },
};
</script>

<style scoped lang="scss">
.filter {
  &__similarity {
    $this: &;
    flex-shrink: 0;
    margin-left: $base-space * 2;
    width: 80px;
    &__content {
      display: flex;
      gap: calc($base-space / 2);
      border-radius: $border-radius;
      padding: 0 0.8em 0 0.4em;
      div[data-title] {
        position: relative;
        @extend %has-tooltip--bottom;
        @extend %tooltip-large-text;
        &:after {
          right: 1em;
          min-width: 300px;
        }
        &:before {
          right: 0.5em !important;
        }
      }
      &.--active {
        background: darken(palette(apricot, light), 2%);
        border: 1px solid palette(apricot, dark);
        align-items: center;
        &[data-title] {
          position: relative;
          @extend %has-tooltip--bottom;
          &:after {
            right: 5em !important;
          }
          &:before {
            right: 3.7em !important;
          }
        }
        #{$this}__icon {
          fill: $brand-primary-color;
        }
      }
    }
    &__icon {
      fill: $black-54;
    }
    &__close {
      fill: $black-54;
    }
    &__button {
      padding-left: 0.5em;
      padding-right: 0.5em;
    }
    &__new {
      padding: 0.2em 0.3em;
      background: $brand-primary-color;
      color: palette(white);
      border-radius: $border-radius;
      text-transform: uppercase;
      @include font-size(11px);
      font-weight: 600;
      align-items: flex-start;
    }
  }
}
</style>

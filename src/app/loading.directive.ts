import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLoadingState]'
})
export class LoadingStateDirective {
  @Input() set appLoadingState({ isLoading, data, useSkeleton }: { isLoading: boolean; data: any[]; useSkeleton: boolean }) {
    this.viewContainer.clear(); // Clear previous state

    if (isLoading) {
      this.viewContainer.createEmbeddedView(useSkeleton ? this.skeletonTemplate : this.loaderTemplate);
    } else if (!data || data.length === 0) {
      // Show No Data Message
      this.viewContainer.createEmbeddedView(this.noDataTemplate);
    } else {
      // Show Actual Content
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>, // Actual Content Template
    private viewContainer: ViewContainerRef // Where content will be rendered
  ) {}

  // Loader Template
  loaderTemplate = {
    createEmbeddedView: () =>
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: `
          <div class="loader">
            <nz-spin nzTip="Loading..."></nz-spin>
          </div>
        `,
      }),
  };

  // Skeleton Template
  skeletonTemplate = {
    createEmbeddedView: () =>
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: `
          <nz-skeleton [nzActive]="true" [nzTitle]="true" [nzParagraph]="{ rows: 3 }"></nz-skeleton>
        `,
      }),
  };

  // No Data Template
  noDataTemplate = {
    createEmbeddedView: () =>
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: `
          <nz-empty nzNotFoundContent="No Data Available"></nz-empty>
        `,
      }),
  };
}

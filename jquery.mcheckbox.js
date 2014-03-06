/**
 * Created by zcl on 14-3-6.
 */
;
(function ($) {
    $.fn.mcheckbox = function (options) {
        var $me = $(this)
            , $cbox = $me.find('input[type=checkbox]')
            , outTemple = function (i, n) {
                return '<div class="selectedInfor selectedShow btn-list"><label>' + n + '</label><em class="close" data-index="' + i + '" data-name="' + n + '"></em></div>'
            },
            obj = {},
            temp = ''
            , defaults = {
                outDiv: '.checkedOut',
                hiddenInput: '#outVal',
                outClear: '.outClear'
            },
            options = $.extend(defaults, options);


        $cbox.on('click', function () {
            var my = $(this);
            var i = $cbox.index(my);
            var name = my.attr('value');
            if (my.prop('checked')) {
                obj[i] = my;
                $(options.outDiv).append(outTemple(i, name));
                temp += name + ',';
            } else {
                $('em').each(function (index, em) {
                    if ($(em).attr('data-index') == i) {
                        $(em).parent().remove();
                    }
                });
                obj[i] = null;
                temp = temp.replace(name + ',', '');
            }
            $(options.hiddenInput).val(temp);

        });
        $(options.out).find('.close').live('click', '', function () {
            var my = $(this);
            var i = my.attr('data-index');
            obj[i].prop("checked", false);
            obj[i] = null;
            my.parent().remove();
            temp = temp.replace(my.attr('data-name') + ',', '');
            $(options.hiddenInput).val(temp);
        });

        $(options.outClear).on('click', function () {
            $('em').each(function (index, em) {
                temp = '';
                obj[$(em).attr('data-index')].prop("checked", false);
                $(em).parent().remove();
            });
            $(options.hiddenInput).val(temp);
        });
    }
}(jQuery))